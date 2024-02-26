export interface Record {
  id: string;
  name: string;
  isrc_id: string;
  duration: number;
  singer: string;
  author: string;
  producer: string;
  category: string;
  createAt: number;
  denyReason: string;
  uploader: string;
  photoUrl?: string;
  approvedBy: string;
  approvedAt: number;
  contractId: string;
  authorizationDate: number;
  expireDate: number;
  format: 'audio' | 'video';
}
