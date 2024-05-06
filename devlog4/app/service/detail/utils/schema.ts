import {
  Schema,
  Number,
  String,
  NestedArray,
} from "fastest-validator-decorators";
@Schema()
export class PostCard {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }
  @Number()
  index!: number;
  @String()
  title!: string;
  @String()
  htmlstr!: string;
  @String()
  shortcontent!: string;
  @String()
  previewimageurl!: string;
  @String()
  name!: string;
  @String()
  taglist!: string;
  @String()
  updatedt!: string;
  @String()
  createdt!: string;
  @String()
  likedcounter!: string;
  // @String({ nullable: true })
  // watchedcounter!: string | null;
}

@Schema()
export class GetPostCardListResponse {
  constructor(obj: unknown) {
    Object.assign(this, obj);
  }

  @NestedArray({ validator: PostCard })
  response!: PostCard[];
}
