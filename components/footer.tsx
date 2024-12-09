import { Mail } from 'lucide-react';

const Footer = () => (
    <footer className="bg-slate-900 py-4">
        <div className="container w-full mx-auto px-4">
            <div className="flex justify-center space-x-8 mb-4">
                <a href="mailto:etrobot@outlook.com" className="text-white">
                    <Mail width={24} height={24} />
                </a>
                <a href="https://x.com/etrobot" className="text-white">
                    <img src="https://cdn.simpleicons.org/x/ffffff" alt="Twitter" width={24} height={24} />
                </a>
                <a href="https://github.com/etrobot" className="text-white">
                    <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" width={24} height={24} />
                </a>
            </div>
            <div className='w-full text-center text-white'>&copy; 2024 AICUBE.FUN All rights reserved.</div>
        </div>
    </footer>
);

export default Footer;