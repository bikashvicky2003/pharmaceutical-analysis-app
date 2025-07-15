import { QueryClient } from "@tanstack/react-query";
import { mockApi } from "./mockData";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [endpoint, ...params] = queryKey as string[];
        
        // Route to appropriate mock API endpoint
        if (endpoint === "/api/projects" && params.length === 2 && params[1] === "variables") {
          return mockApi.getVariablesByProject(Number(params[0]));
        }
        
        if (endpoint === "/api/projects" && params.length === 2 && params[1] === "samples") {
          return mockApi.getSamplesByProject(Number(params[0]));
        }
        
        if (endpoint === "/api/projects" && params.length === 2 && params[1] === "analysis") {
          const result = await mockApi.getLatestAnalysis(Number(params[0]));
          if (!result) throw new Error("No analysis results found");
          return result;
        }
        
        throw new Error(`Unknown endpoint: ${endpoint}`);
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export async function apiRequest(method: string, endpoint: string, data?: any) {
  // Mock API implementation for client-only deployment
  if (method === "POST" && endpoint === "/api/projects") {
    return { json: () => mockApi.createProject(data) };
  }
  
  if (method === "POST" && endpoint.includes("/variables")) {
    return { json: () => mockApi.createVariable(data) };
  }
  
  if (method === "DELETE" && endpoint.includes("/variables/")) {
    const id = Number(endpoint.split('/').pop());
    mockApi.deleteVariable(id);
    return { json: () => ({ success: true }) };
  }
  
  if (method === "POST" && endpoint.includes("/samples")) {
    return { json: () => mockApi.createSample(data) };
  }
  
  if (method === "PUT" && endpoint.includes("/samples/")) {
    const id = Number(endpoint.split('/').pop());
    return { json: () => mockApi.updateSample(id, data) };
  }
  
  if (method === "POST" && endpoint.includes("/analyze")) {
    const projectId = Number(endpoint.split('/')[2]);
    return { json: () => mockApi.runAnalysis(projectId) };
  }
  
  throw new Error(`Unsupported API call: ${method} ${endpoint}`);
}
