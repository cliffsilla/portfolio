# Clifford Silla - Developer Portfolio

A modern, responsive developer portfolio built with Next.js 15, TypeScript, and Tailwind CSS. This portfolio showcases professional experience, skills, and projects with a sleek, interactive UI.

![Portfolio Preview](https://github.com/cliffsilla/portfolio/raw/master/public/portfolio-preview.png)

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dark Mode Support**: Default dark theme with light mode toggle
- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **Section Navigation**: Smooth scrolling between different portfolio sections
- **Dynamic Background**: Background changes based on the active section
- **Experience Section**: Expandable work history with 'View More' functionality
- **Project Showcase**: Featured projects with technology tags
- **Skills Display**: Categorized technical skills with visual indicators
- **Contact Form**: Functional contact form with EmailJS integration
- **Social Links**: Easy access to professional profiles and contact information
- **Custom Scrollbars**: Enhanced scrolling experience in expandable sections

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- pnpm package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/cliffsilla/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Run the development server
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                  # Next.js App Router files
│   ├── globals.css       # Global styles including custom scrollbar
│   ├── layout.tsx       # Root layout with fonts and theme provider
│   └── page.tsx         # Main portfolio page component
├── components/          # Reusable UI components (Shadcn)
│   ├── ui/              # UI components from Shadcn
│   └── theme-provider.tsx # Theme provider for dark/light mode
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── public/              # Static assets (images, etc.)
└── styles/              # Additional styles
```

## Customization

The portfolio is designed to be easily customizable:

### Personal Information

Update your personal information in `app/page.tsx`:

- **Profile**: Change name, title, and bio in the Hero section
- **Experience**: Modify the `experiences` array with your work history
- **Projects**: Update the `projects` array with your portfolio items
- **Skills**: Edit the `skills` array to showcase your technical abilities
- **Contact**: Update contact information and social links

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.ts` and `app/globals.css`
- **Fonts**: Change fonts in `app/layout.tsx`
- **Background Images**: Replace images in the `public` folder and update paths in `getBackgroundStyle()`

## Setting Up Email Functionality

The contact form is set up to send emails using EmailJS. Follow these steps to configure it:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)

2. Create a new Email Service (Gmail, Outlook, etc.)

3. Create a new Email Template with the following template variables:
   - `from_name`: Sender's name
   - `from_email`: Sender's email
   - `subject`: Email subject
   - `message`: Email message
   - `to_email`: Your email address (clifford.silla@gmail.com)

4. Get your EmailJS credentials and update the following in `app/page.tsx`:
   ```javascript
   await emailjs.send(
     'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
     'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
     {
       from_name: formData.name,
       from_email: formData.email,
       subject: formData.subject || 'Portfolio Contact Form',
       message: formData.message,
       to_email: 'clifford.silla@gmail.com'
     },
     'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
   )
   ```

## Deployment

This project can be easily deployed to various hosting platforms:

### Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com/)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Run the following command in the project directory:
   ```bash
   vercel
   ```

### Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Build the project locally:
   ```bash
   pnpm build
   ```
3. Deploy the `out` directory using Netlify CLI or drag and drop it to the Netlify dashboard

### GitHub Pages

1. Update `next.config.mjs` to include your repository name as the base path:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/portfolio',
     // other config...
   }
   ```
2. Build the project:
   ```bash
   pnpm build
   ```
3. Push the `out` directory to the `gh-pages` branch of your repository

## Troubleshooting

### Common Issues

- **Missing dependencies**: If you encounter errors about missing dependencies, run `pnpm install` again
- **EmailJS configuration**: Ensure you've properly set up your EmailJS account and replaced the placeholder IDs
- **Image optimization**: If you encounter issues with images, check the `next.config.mjs` file for image configuration
- **Scrollbar not working**: Some browsers may require additional prefixes for the custom scrollbar styling

### Development Tips

- Use the browser console to debug JavaScript issues
- Check the Network tab in DevTools to verify EmailJS API calls
- Test the responsive design using the device toolbar in your browser

## Technologies Used

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Shadcn UI
- **Email Service**: EmailJS
- **Package Manager**: pnpm

## License

This project is licensed under the MIT License.

---

Built with ❤️ by Clifford Silla
