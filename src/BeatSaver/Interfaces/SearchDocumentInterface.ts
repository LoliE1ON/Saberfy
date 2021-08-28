export interface SearchDocumentInterface {
    name: string;
    versions: DocumentVersion[];
}

interface DocumentVersion {
    downloadURL: string;
}