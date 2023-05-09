import { Test, TestingModule } from '@nestjs/testing';
import { StudyScheduleController } from './study-schedule.controller';

describe('StudyScheduleController', () => {
  let controller: StudyScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyScheduleController],
    }).compile();

    controller = module.get<StudyScheduleController>(StudyScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
