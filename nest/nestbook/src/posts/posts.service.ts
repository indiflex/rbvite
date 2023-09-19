import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private readonly entityManger: EntityManager) {}

  private async getUser(createPostDto: CreatePostDto) {
    const { writer: id } = createPostDto;
    return this.entityManger.findOne(User, { where: { id } });
  }

  async create(createPostDto: CreatePostDto) {
    // const { writer: id } = createPostDto;
    // const writer = await this.entityManger.findOne(User, { where: { id } });
    const writer = await this.getUser(createPostDto);
    const post = new Post({ ...createPostDto, writer });
    return this.entityManger.save(post);
  }

  findAll() {
    return this.entityManger.find(Post);
  }

  findOne(id: number) {
    return this.entityManger.findOne(Post, {
      where: { id },
      select: { writer: { id: true, name: true } },
      relations: { writer: true },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    console.log('update=', updatePostDto);
    const post = await this.findOne(id);
    // const post = await this.entityManger.findOne(Post, {
    //   where: { id },
    //   relations: { writer: true },
    // });
    console.log('🚀  post:', post);
    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    return this.entityManger.save(post);
  }

  remove(id: number) {
    return this.entityManger.delete(Post, { id });
  }
}
