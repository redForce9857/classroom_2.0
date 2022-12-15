import { Injectable, PipeTransform } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as sharp from "sharp";
@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    const originalName = path.parse(image.originalname).name;
    const filename = uuidv4() + originalName + ".webp";

    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join("images", filename));
    return filename;
  }
}
