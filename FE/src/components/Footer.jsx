import React from 'react'

const Footer = () => {
    const footerLinks = [{text:"Terms of Service",link:"#"},{text:"Privacy Policy",link:"#"},{text:"Contact",link:"#"}]
  return (
    <div className='text-[#a1a1a1] flex flex-row items-center justify-between px-10 py-10 border-t-1 border-[#f9e866a8] mt-10'>
        <div className="flex items-center gap-2">
            <div className="size-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-icon lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg></div>
            <div className="text-sm">© 2025 LinkShrink. Built by ACP.IO</div>
        </div>
        <div className="flex flex-row gap-17">
            {footerLinks.map((link)=>(
                <a href={link.link} className='text-sm hover:text-white'>{link.text}</a>
            ))}
        </div>
    </div>
  )
}

export default Footer