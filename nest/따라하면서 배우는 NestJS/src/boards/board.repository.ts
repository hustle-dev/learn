import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

/**
 * @EntityRepository()가 deprecated 됨
 * 아래 링크 참고해 dataSource로 createEntityManager()를 사용!
 * 미리 정의된 커넥션 설정으로 db에 여러 개의 데이터소스를 연결하고 여러 db에 연결할 수 있음
 * @link https://stackoverflow.com/questions/71557301/how-to-workraound-this-typeorm-error-entityrepository-is-deprecated-use-repo
 */
@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }
}
