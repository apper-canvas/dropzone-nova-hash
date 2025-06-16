import shareLinksData from '../mockData/shareLinks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let shareLinks = [...shareLinksData];

const shareLinkService = {
  async getAll() {
    await delay(250);
    return [...shareLinks];
  },

  async getById(id) {
    await delay(200);
    const link = shareLinks.find(link => link.Id === parseInt(id, 10));
    return link ? { ...link } : null;
  },

  async getByFileId(fileId) {
    await delay(200);
    const link = shareLinks.find(link => link.fileId === parseInt(fileId, 10));
    return link ? { ...link } : null;
  },

  async create(linkData) {
    await delay(300);
    const newLink = {
      ...linkData,
      Id: Math.max(...shareLinks.map(l => l.Id), 0) + 1,
      shortUrl: `https://drop.zone/${Math.random().toString(36).substr(2, 8)}`,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };
    shareLinks.push(newLink);
    return { ...newLink };
  },

  async update(id, updatedData) {
    await delay(250);
    const index = shareLinks.findIndex(link => link.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Share link not found');
    }
    
    const { Id, ...dataWithoutId } = updatedData;
    shareLinks[index] = { ...shareLinks[index], ...dataWithoutId };
    return { ...shareLinks[index] };
  },

  async delete(id) {
    await delay(300);
    const index = shareLinks.findIndex(link => link.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Share link not found');
    }
    
    const deletedLink = shareLinks[index];
    shareLinks.splice(index, 1);
    return { ...deletedLink };
  },

  async generateShareLink(fileId) {
    await delay(400);
    
    // Check if link already exists
    const existingLink = await this.getByFileId(fileId);
    if (existingLink) {
      return existingLink;
    }
    
    // Create new share link
    const newLink = await this.create({
      fileId: parseInt(fileId, 10)
    });
    
    return newLink;
  }
};

export default shareLinkService;