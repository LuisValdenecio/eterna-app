import '@/styles/tailwind.css'
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: {
    template: '%s - Eterna backup',
    default: 'Eterna backup',
  },
  description: '',
}

export default async function RootLayout({ children } : {children: React.ReactNode}) {
  
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950 h-full bg-gray-50"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className='h-full mx-auto'>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster/>
      </body>
    </html>
  )
}
