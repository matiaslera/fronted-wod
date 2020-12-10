import { FileItem } from './fileItem';


export class ImageValidator {
  private acceptType = ['image/jpeg', 'image/png','image/jpg'];

  validateType(fileType: string): boolean {
    return fileType === '' || fileType === undefined
      ? false
      : this.acceptType.includes(fileType);
  }

  checkDropped(fileName: string, files: FileItem[]): boolean {
    for (const file of files) {
        return file.name === fileName
      /* if (file.name === fileName) {
        return true;
      } */
    }
    return false;
  }
}