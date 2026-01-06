# UI Elements Training

A training site for reviewing UI elements and conversation data points.

## Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Deploying to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Initial Setup

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Connect to GitHub repository**:
   ```bash
   git remote add origin https://github.com/snorkel-ai/UI-Elements-Training.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the changes

4. **Push your code**:
   ```bash
   git push origin main
   ```

The GitHub Actions workflow will automatically build and deploy your site to GitHub Pages. The site will be available at:
`https://snorkel-ai.github.io/UI-Elements-Training/`

### Manual Deployment

If you need to deploy manually, you can also:

1. Build the project:
   ```bash
   npm run build
   ```

2. Push the `dist` folder to the `gh-pages` branch (or use GitHub Actions as configured above)

## Project Structure

- `src/` - React source code
- `public/` - Static assets and example data
- `.github/workflows/` - GitHub Actions deployment workflow
