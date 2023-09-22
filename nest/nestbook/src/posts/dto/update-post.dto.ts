import { CreatePostDto } from './create-post.dto';

// export class UpdatePostDto extends PartialType(CreatePostDto) {}
// export class UpdatePostDto extends OmitType(CreatePostDto, [] as const) {}
export class UpdatePostDto extends CreatePostDto {}
