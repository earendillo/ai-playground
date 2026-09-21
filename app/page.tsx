const icons = {
  home: '/figma/home.svg',
  search: '/figma/search.svg',
  analytics: '/figma/pie-chart.svg',
  history: '/figma/clock.svg',
  profile: '/figma/user.svg',
} as const;

const menuItems = [
  { id: '1:4', iconId: '1:5', labelId: '1:11', label: 'Home', icon: icons.home, href: '#home' },
  { id: '1:12', iconId: '107:1016', labelId: '1:19', label: 'Search', icon: icons.search, href: '#search' },
  { id: '1:20', iconId: '107:951', labelId: '1:27', label: 'Analytics', icon: icons.analytics, href: '#analytics', active: true },
  { id: '1:28', iconId: '107:1013', labelId: '1:35', label: 'History', icon: icons.history, href: '#history' },
  { id: '1:36', iconId: '107:1010', labelId: '1:43', label: 'Profile', icon: icons.profile, href: '#profile' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6f7] p-6">
      <nav
        aria-label="Bottom navigation"
        className="relative h-[129px] w-[393px] overflow-hidden rounded-[24px] bg-[#f5f6f7]"
        data-node-id="1:2"
      >
        <div
          className="absolute bottom-[30px] left-0 flex h-[58px] w-full items-center justify-center bg-white px-3 pt-3"
          data-node-id="1:3"
        >
          {menuItems.map((item) => (
            <a
              key={item.id}
              aria-current={item.active ? 'page' : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1.5 ${item.active ? 'text-[#539df3]' : 'text-[#484c52]'}`}
              data-node-id={item.id}
              href={item.href}
            >
              <svg aria-hidden="true" className="h-6 w-6 shrink-0" data-node-id={item.iconId} viewBox="0 0 24 24">
                <image href={item.icon} height="24" width="24" />
              </svg>
              <span
                className={`text-[12px] leading-[16px] ${item.active ? 'font-medium' : 'font-normal'}`}
                data-node-id={item.labelId}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 h-[30px] w-full bg-white" data-node-id="1:44">
          <div className="absolute bottom-2 left-1/2 h-[5px] w-[135px] -translate-x-1/2 rounded-[100px] bg-[#b9c0c9]" data-node-id="1:45" />
        </div>
      </nav>
    </main>
  );
}
