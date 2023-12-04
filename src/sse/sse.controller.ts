import {
  Body,
  Controller,
  Post,
  Sse,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interval, map, take } from 'rxjs';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse()
  @UseInterceptors(FilesInterceptor('files'))
  getData(@UploadedFiles() files, @Body() createChatPromptDto: any) {
    /* console.log(files[0]); */
    return interval(500).pipe(
      map((count) => `Hello, world! ${count}`),
      take(5),
    );
  }
}
