import { Storage } from '@google-cloud/storage';
import credentials from '../Jsons/Cloud.json';
import DecryptJson from 'src/handlers/Decrypt';
import { PropsDelete, PropsUpload } from 'src/types/Google';

class StorageGoogleCloud {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    const EnCredential = credentials.k;
    const DecryptJsonData = DecryptJson({
      encryptedData: EnCredential,
      password: process.env.JWT_PASSWORD,
    });

    this.storage = new Storage({
      projectId: process.env.NAME_PROJECTID,
      credentials: DecryptJsonData,
    });

    this.bucketName = process.env.BUCKET_NAME as string;
  }

  // Método para subir archivos al bucket
  async Upload({ file, bookId, name, upId }: PropsUpload) {
    try {
      if (!file) throw new Error('No file provided');
      if (file.size < 1) throw new Error('File is empty');

      const buffer = await file.arrayBuffer();
      const fileName = `${name}-${bookId}-${upId}.pdf`;

      await this.storage
        .bucket(this.bucketName)
        .file(fileName)
        .save(Buffer.from(buffer))
        .catch((error) => {
          throw new Error(error.message);
        });

      return {
        success: true,
        public_name: fileName,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  }

  // Método para eliminar archivos del bucket
  async remove({ type, bookId, upId }: PropsDelete) {
    try {
      const fileName = `${type}-${bookId}-${upId}.pdf`;
      const file = this.storage.bucket(this.bucketName).file(fileName);

      // Verificar si el archivo existe antes de eliminar
      const [exists] = await file.exists();
      if (!exists) {
        throw new Error(`File ${fileName} not found`);
      }

      // Eliminar el archivo
      await file.delete().catch((error) => {
        throw new Error(`Failed to delete file: ${error.message}`);
      });

      return {
        success: true,
        message: `File ${fileName} deleted successfully`,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  }
}

export default StorageGoogleCloud;
