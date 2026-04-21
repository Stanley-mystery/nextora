import { Avatar, Dropdown } from 'antd';
import { Logo } from '../logo';
import { cn } from '@/utils';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useLogout, useUser } from '@/lib/auth';
import { VscBell } from 'react-icons/vsc';
import { ChevronDown } from 'react-feather';
import { ROUTES } from '@/constants/routes';
import { APP_NAME } from '@/constants/config';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const { data: user } = useUser();
  const { mutate: logout } = useLogout();

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  const items = [
    {
      key: '1',
      label: (
        <Link className="text-sm w-full text-left" to="/profile">
          Profile
        </Link>
      ),
    },
    {
      key: '8',
      label: (
        <button className="text-sm w-full text-left" onClick={() => logout()}>
          Log Out
        </button>
      ),
    },
  ];

  const navItems: Array<{ id: string; label: string; to?: string }> = [
    { id: 'dashboard', label: 'Dashboard', to: ROUTES.DASHBOARD },
    { id: 'returns', label: 'Returns Management' },
    { id: 'roles', label: 'Roles & Permission', to: ROUTES.MANAGE.ROLES_AND_PERMISSIONS },
    { id: 'users', label: 'User Management', to: ROUTES.MANAGE.USER_MANAGEMENT },
    { id: 'profile', label: 'Profile', to: ROUTES.PROFILE },
  ];

  const isActivePath = (to?: string) =>
    !!to && (location.pathname === to || (to !== '/' && location.pathname.startsWith(`${to}/`)));

  return (
    <header
      className={cn(
        'fixed top-0 w-full px-4 sm:px-6 lg:px-12 max-w-full border-b border-b-zinc-200 py-3 md:py-0 z-10',
        'bg-white',
        className,
      )}
    >
      <div className="flex items-center justify-between py-2">
        <div className="flex-shrink-0 flex items-center gap-4">
          <Logo height={16} width={32} to="/" />
          <div className="break-normal text-xs font-bold w-min leading-tight text-zinc-700">{APP_NAME.full}</div>
        </div>

        <div className="hidden items-center space-x-8 md:flex">
          <button className="text-sm">
            <VscBell size={20} className="text-gray-500" />
          </button>

          <Dropdown
            menu={{ items }}
            trigger={['click']}
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
            rootClassName="header-dropdown text-left"
          >
            <div className="flex items-center p-4 px-0 bg-transparent rounded-md cursor-pointer">
              <div className="flex items-center space-x-0.5 md:space-x-2.5">
                <Avatar size={34} src={user?.photo} className="bg-[#919194]" style={{ fontSize: '0.9rem' }}>
                  {!user?.photo && user?.firstName?.[0]?.toUpperCase()}
                </Avatar>
                <div className="flex flex-col max-w-32">
                  <span className="text-sm font-semibold truncate">
                    {user?.firstName || ''} {user?.lastName || ''}
                  </span>
                  <span className="text-xs text-gray-500 truncate">{user?.role?.displayName || ''}</span>
                </div>
                <div className="relative">
                  <ChevronDown size={14} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </Dropdown>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="hidden md:block border-t border-t-zinc-200">
        <div className="flex items-center gap-6 h-12">
          {navItems.map((item) => {
            const active = isActivePath(item.to);

            return item.to ? (
              <Link
                key={item.id}
                to={item.to}
                className={cn(
                  'text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors',
                  'h-full inline-flex items-center',
                  active ? 'text-zinc-950 border-zinc-950 font-semibold' : 'border-transparent',
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.id}
                className={cn(
                  'text-sm font-medium text-zinc-400',
                  'h-full inline-flex items-center border-b-2 border-transparent cursor-not-allowed select-none',
                )}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </nav>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="px-0 pt-2 pb-3 space-y-1 border-t border-t-zinc-200 mt-3">
          {navItems.map((item) => {
            const active = isActivePath(item.to);
            return item.to ? (
              <Link
                key={item.id}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'block px-0 py-2 rounded-md text-sm font-semibold transition-colors',
                  active ? 'text-zinc-950' : 'text-zinc-600 hover:text-zinc-950',
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.id}
                className="block px-0 py-2 rounded-md text-sm font-semibold text-zinc-400 cursor-not-allowed select-none"
              >
                {item.label}
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
