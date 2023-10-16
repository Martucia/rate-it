import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
    async uploadFiles(files: Express.Multer.File[]) {
        try {
            const uploadedFiles = await Promise.all(files.map(async file => {
                const savedFile = await this.uploadFile(file);
                return savedFile;
            }));

            return uploadedFiles;
        } catch (error) {
            throw new InternalServerErrorException("Problem with file upload");
        }
    }

    async uploadFile(file: Express.Multer.File) {
        if (!file.originalname) {
            throw new Error('Missing originalname in file details');
        }

        const fileExtension = file.originalname.split('.').pop();
        const filename = `${Date.now()}-${file.originalname}`;
        const filePath = join(__dirname, '..', '..', 'images', filename);

        const fileStream = createWriteStream(filePath);
        fileStream.write(file.buffer);

        // return {
        //     originalname: file.originalname,
        //     filename: filename,
        //     path: filePath,
        // };

        return filename;
    }
}
