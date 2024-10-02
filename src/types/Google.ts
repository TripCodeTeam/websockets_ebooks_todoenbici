import { EncryptJson } from 'src/handlers/Encrypt';

export interface PropsUpload {
  file: File;
  bookId: string;
  name: string;
  upId: string;
}

export interface PropsDelete {
  type: string;
  bookId: string;
  upId: string;
}

export type EncryptJsonProps = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
};
