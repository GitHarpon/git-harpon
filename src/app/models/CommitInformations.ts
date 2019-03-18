export class CommitDescription {
    oid: string;      // SHA1 object id of this commit
    message: string;  // Commit message
    tree: string;     // SHA1 object id of corresponding file tree
    parent: string[]; // an array of zero or more SHA1 object ids
    author: {
      name: string;          // The author's name
      email: string;         // The author's email
      timestamp: number;     // UTC Unix timestamp in seconds
      timezoneOffset: number // Timezone difference from UTC in minutes
    };
    committer: {
      name: string;          // The committer's name
      email: string;         // The committer's email
      timestamp: number;     // UTC Unix timestamp in seconds
      timezoneOffset: number // Timezone difference from UTC in minutes
    };
    gpgsig: string;   // PGP signature (if present),
    files: any[];
}
