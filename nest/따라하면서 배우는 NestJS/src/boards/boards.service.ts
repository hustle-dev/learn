import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

/**
 * Injectable 덕분에 다른 컴포넌트에서 이 서비스를 사용할 수 있게 만들어준다.
 * → 컨트롤러에서 이를 주입받아 사용하기 위해!(DI)
 */
@Injectable()
export class BoardsService {
  // BoardRepository를 이용한다고 알려주기 위해 @InjectBoardRepository를 변수에 넣어준다.
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  // 데이터베이스 작업을 할땐 async, await를 붙여준다.
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: {
        id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({
      id,
      user: {
        id: user.id,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
