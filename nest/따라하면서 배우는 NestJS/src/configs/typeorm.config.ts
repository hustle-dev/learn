import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

type DB = {
  type: 'postgres';
  port: number;
  database: string;
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
};

const dbConfig = config.get<DB>('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: Number(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  // 엔티티를 이용해 데이터베이스 테이블을 생성
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // true이면 애플리케이션을 다시 실행할 때, 엔티티안에서 수정된 컬럼의 길이 타입 변경 값등을
  // 해당 테이블을 Drop한 후 다시 생성
  synchronize: dbConfig.synchronize,
};
