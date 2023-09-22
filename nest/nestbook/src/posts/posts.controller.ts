import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('/:namespace/:version/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/tags')
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.postsService.createTag(createTagDto);
  }

  @Get('/tags/:id')
  findTag(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findTag(id);
  }

  // api/v0.2/posts/tags?q=오늘은
  @Get('/tags')
  findTagByName(@Query('q') q: string) {
    return this.postsService.findTagByName(q);
  }

  @Delete('/tags/:id')
  removeTag(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.removeTag(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query('tname') tname: string) {
    return this.postsService.findAll(tname);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
