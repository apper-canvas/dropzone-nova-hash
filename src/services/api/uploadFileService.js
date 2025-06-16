import uploadFilesData from '../mockData/uploadFiles.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let uploadFiles = [...uploadFilesData];

const uploadFileService = {
  async getAll() {
    await delay(300);
    return [...uploadFiles];
  },

  async getById(id) {
    await delay(200);
    const file = uploadFiles.find(file => file.Id === parseInt(id, 10));
    return file ? { ...file } : null;
  },

  async create(fileData) {
    await delay(500);
    const newFile = {
      ...fileData,
      Id: Math.max(...uploadFiles.map(f => f.Id), 0) + 1,
      uploadedAt: new Date().toISOString(),
      status: 'uploading',
      uploadProgress: 0
    };
    uploadFiles.push(newFile);
    return { ...newFile };
  },

  async update(id, updatedData) {
    await delay(300);
    const index = uploadFiles.findIndex(file => file.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('File not found');
    }
    
    const { Id, ...dataWithoutId } = updatedData;
    uploadFiles[index] = { ...uploadFiles[index], ...dataWithoutId };
    return { ...uploadFiles[index] };
  },

  async delete(id) {
    await delay(400);
    const index = uploadFiles.findIndex(file => file.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('File not found');
    }
    
    const deletedFile = uploadFiles[index];
    uploadFiles.splice(index, 1);
    return { ...deletedFile };
  },

  async simulateUpload(file, onProgress) {
    const uploadFile = await this.create({
      name: file.name,
      size: file.size,
      type: file.type,
      url: '',
      thumbnailUrl: '',
      uploadProgress: 0,
      status: 'uploading'
    });

    // Simulate upload progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(async () => {
        progress += Math.random() * 15 + 5; // Random progress between 5-20%
        progress = Math.min(progress, 100);
        
        await this.update(uploadFile.Id, {
          uploadProgress: Math.round(progress)
        });
        
        if (onProgress) {
          onProgress(Math.round(progress));
        }
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Generate mock URLs
          const fileUrl = `https://cdn.dropzone.app/files/${uploadFile.Id}/${encodeURIComponent(file.name)}`;
          const thumbnailUrl = file.type.startsWith('image/') 
            ? `https://cdn.dropzone.app/thumbnails/${uploadFile.Id}.jpg`
            : null;
          
          const completedFile = await this.update(uploadFile.Id, {
            status: 'completed',
            url: fileUrl,
            thumbnailUrl: thumbnailUrl,
            uploadProgress: 100
          });
          
          resolve(completedFile);
        }
      }, 200);
    });
  }
};

export default uploadFileService;