# Pharmaceutical CQA-CPP Analysis Application

A professional web application for pharmaceutical tablet Critical Quality Attributes (CQA) and Critical Process Parameters (CPP) statistical analysis.

## Features

- **Variables Management**: Define and manage CQA and CPP variables with units
- **Sample Data Entry**: Input experimental data with real-time validation
- **Statistical Analysis**: Correlation matrix, regression analysis, and significance testing
- **Results Visualization**: Professional charts and statistical summaries
- **Data Export**: CSV import/export functionality
- **Professional UI**: Modern pharmaceutical-themed interface

## Technology Stack

- **Frontend**: React 18 with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: In-memory storage (easily extendable to PostgreSQL)
- **State Management**: React Query for server state
- **Build Tool**: Vite for development and production builds

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pharmaceutical-analysis-app.git
cd pharmaceutical-analysis-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Usage

1. **Variables Setup**: Add CQA and CPP variables with their units
2. **Data Input**: Enter sample data for each variable
3. **Statistical Analysis**: Run correlation and regression analysis
4. **Results**: View statistical results and export data

## Deployment

### GitHub Pages Deployment

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

3. Deploy to GitHub Pages using GitHub Actions (see `.github/workflows/deploy.yml`)

### Manual Deployment

1. Build the application
2. Upload the `dist/` folder contents to your web server
3. Configure your server to serve the static files

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking

## License

MIT License
