import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async getCurrentUser() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return the first user as current user (single-user app)
    return this.users[0] ? { ...this.users[0] } : null;
  }

  async updateUser(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const userIndex = this.users.findIndex(user => user.Id === parseInt(id));
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return { ...this.users[userIndex] };
  }

  async incrementProductCount(userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const userIndex = this.users.findIndex(user => user.Id === parseInt(userId));
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    this.users[userIndex].productsCreated += 1;
    return { ...this.users[userIndex] };
  }
}

export default new UserService();