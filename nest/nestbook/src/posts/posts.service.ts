import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager, In } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(private readonly entityManger: EntityManager) {}

  createTag(createTagDto: CreateTagDto) {
    return this.entityManger.save(new Tag(createTagDto));
  }

  findTag(id: number) {
    return this.entityManger.findOne(Tag, { where: { id } });
  }

  findTagByName(q: string) {
    return this.entityManger.findBy(Tag, { tname: q });
  }

  removeTag(id: number) {
    return this.entityManger.delete(Tag, { id });
  }

  private async getUser(createPostDto: CreatePostDto) {
    const { writer: id } = createPostDto;
    return this.entityManger.findOne(User, {
      where: { id },
      select: { id: true, name: true },
    });
  }

  private async arrageTags(dto: CreatePostDto | UpdatePostDto) {
    const existsTags = await this.entityManger.findBy(Tag, {
      tname: In(dto.tagNames),
    });
    const existsTagNames = existsTags.map((tag) => tag.tname);
    const toCreateTags = dto.tags
      ?.filter((tag) => !existsTagNames.includes(tag.tname))
      ?.map((tag) => new Tag(tag));

    return [...existsTags, ...toCreateTags];
  }

  async create(createPostDto: CreatePostDto) {
    const writer = await this.getUser(createPostDto);

    const tags = await this.arrageTags(createPostDto);
    const post = new Post({
      ...createPostDto,
      writer,
      tags,
    });
    return this.entityManger.save(post);
  }

  async findAll(tname: string) {
    console.log('🚀  tname:', tname);

    if (!tname) {
      return this.entityManger.find(Post);
    } else {
      const tag = await this.entityManger.findOne(Tag, {
        where: { tname },
        select: { id: true },
      });
      return this.entityManger.findBy(Post, { tags: [tag] });

      // const tags = await this.entityManger.findBy(Tag, { tname });
      // return this.entityManger.findBy(Post, { tags });
    }
  }

  findOne(id: number) {
    return this.entityManger.findOne(Post, {
      where: { id },
      select: { writer: { id: true, name: true } },
      relations: { writer: true },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // console.log('update=', updatePostDto);
    const post = await this.findOne(id);
    // const post = await this.entityManger.findOne(Post, {
    //   where: { id },
    //   relations: { writer: true },
    // });
    // console.log('🚀  post:', post);
    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    post.tags = await this.arrageTags(updatePostDto);
    return this.entityManger.save(post);
  }

  remove(id: number) {
    return this.entityManger.delete(Post, { id });
  }
}
