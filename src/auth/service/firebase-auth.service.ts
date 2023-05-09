import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
import { environment } from '../../config/environment';
import { StudentService } from '../../student/service/student.service';
import { FirebaseUser } from '../../type/firebase-user.interface';

const firebase_params = {
  type: environment.firebaseAuthConfig.type,
  projectId: environment.firebaseAuthConfig.project_id,
  privateKeyId: environment.firebaseAuthConfig.private_key_id,
  privateKey: environment.firebaseAuthConfig.private_key,
  clientEmail: environment.firebaseAuthConfig.client_email,
  clientId: environment.firebaseAuthConfig.client_id,
  authUri: environment.firebaseAuthConfig.auth_uri,
  tokenUri: environment.firebaseAuthConfig.token_uri,
  authProviderX509CertUrl:
    environment.firebaseAuthConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: environment.firebaseAuthConfig.client_x509_cert_url,
};

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: any;
  constructor(private readonly studentService: StudentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }
  async validate(token: string) {
    const firebaseUser: FirebaseUser = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return await this.checkStudent(firebaseUser.email);
  }

  async checkStudent(email: string) {
    try {
      return await this.studentService.getStudentByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return await this.studentService.create(email);
      }
    }
  }
}
