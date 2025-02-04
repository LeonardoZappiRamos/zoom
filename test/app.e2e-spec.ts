import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let sut: NestFastifyApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    sut = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await sut.init();
    await sut.getHttpAdapter().getInstance().ready();
  });

  it('/ (GET)', () => {
    return request(sut.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await sut.close();
  })
});
