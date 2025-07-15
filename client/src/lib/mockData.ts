// Mock data for client-only deployment
export const mockStorage = {
  projects: new Map(),
  variables: new Map(),
  samples: new Map(),
  analysisResults: new Map(),
  currentIds: { project: 1, variable: 1, sample: 1, analysis: 1 }
};

export const mockApi = {
  // Projects
  async getProject(id: number) {
    return mockStorage.projects.get(id);
  },
  
  async createProject(data: any) {
    const id = mockStorage.currentIds.project++;
    const project = { ...data, id, createdAt: new Date().toISOString() };
    mockStorage.projects.set(id, project);
    return project;
  },
  
  // Variables
  async getVariablesByProject(projectId: number) {
    return Array.from(mockStorage.variables.values()).filter(v => v.projectId === projectId);
  },
  
  async createVariable(data: any) {
    const id = mockStorage.currentIds.variable++;
    const variable = { ...data, id };
    mockStorage.variables.set(id, variable);
    return variable;
  },
  
  async deleteVariable(id: number) {
    return mockStorage.variables.delete(id);
  },
  
  // Samples
  async getSamplesByProject(projectId: number) {
    return Array.from(mockStorage.samples.values()).filter(s => s.projectId === projectId);
  },
  
  async createSample(data: any) {
    const id = mockStorage.currentIds.sample++;
    const sample = { ...data, id };
    mockStorage.samples.set(id, sample);
    return sample;
  },
  
  async updateSample(id: number, data: any) {
    const existing = mockStorage.samples.get(id);
    if (existing) {
      const updated = { ...existing, ...data };
      mockStorage.samples.set(id, updated);
      return updated;
    }
    throw new Error('Sample not found');
  },
  
  // Analysis
  async runAnalysis(projectId: number) {
    const { calculateCorrelationMatrix, performRegressionAnalysis, calculateSignificanceTests } = await import('./statistics');
    
    const variables = await this.getVariablesByProject(projectId);
    const samples = await this.getSamplesByProject(projectId);
    
    const cqaVariables = variables.filter(v => v.type === 'cqa');
    const cppVariables = variables.filter(v => v.type === 'cpp');
    
    const data = samples.map(sample => {
      const values: number[] = [];
      [...cqaVariables, ...cppVariables].forEach(variable => {
        const value = sample.data[variable.id];
        values.push(typeof value === 'number' ? value : 0);
      });
      return values;
    });
    
    const correlationMatrix = calculateCorrelationMatrix(data);
    const regressionResults = performRegressionAnalysis(data, cqaVariables.length, cppVariables.length);
    const significanceTests = calculateSignificanceTests(correlationMatrix, samples.length);
    
    const id = mockStorage.currentIds.analysis++;
    const result = {
      id,
      projectId,
      correlationMatrix,
      regressionResults,
      significanceTests,
      createdAt: new Date().toISOString()
    };
    
    mockStorage.analysisResults.set(id, result);
    return result;
  },
  
  async getLatestAnalysis(projectId: number) {
    const results = Array.from(mockStorage.analysisResults.values())
      .filter(r => r.projectId === projectId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return results[0];
  }
};
