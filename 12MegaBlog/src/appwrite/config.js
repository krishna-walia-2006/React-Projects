import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // NOTE: this collection's schema attributes are lowercase (userid,
    // featuredimage) - keep these field names in sync with the Appwrite
    // console's Attributes tab if you ever rename them there.

    async createPost({ title, slug, content, featuredimage, status, userid }) {
        try {
            return await this.databases.createDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                },
            });
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredimage,
                    status,
                },
            });
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error', error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
            });
            return true;
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            // A single post is fetched by its document ID (the slug),
            // so this needs getDocument - listDocuments is for filtered
            // lists and expects a queries array, not a bare ID.
            return await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
            });
        } catch (error) {
            console.log('Appwrite service :: getPost :: error', error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                queries,
            });
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error', error);
            return false;
        }
    }

    // file service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error', error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId,
            });
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        // getFileView (not getFilePreview) - Appwrite Cloud's free plan
        // blocks the on-the-fly image transformations getFilePreview
        // performs, but getFileView serves the raw file with no
        // transformation and isn't affected by that restriction.
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId,
        });
    }
}

const service = new Service();
export default service;
