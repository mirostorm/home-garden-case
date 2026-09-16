import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui';
import { HouseIcon, PlantIcon, TreeIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

const navItems = [
  {
    title: 'Home',
    url: '/',
    icon: <HouseIcon />,
    isActive: true,
  },
  {
    title: 'My Gardens',
    url: '/gardens',
    icon: <TreeIcon />,
  },
  {
    title: 'My Plants',
    url: '/plants',
    icon: <PlantIcon />,
  },
];

const AppSidebar = (props: ComponentProps<typeof Sidebar>) => {
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton onClick={() => router.push('/')} className="cursor-pointer">
          <Image src="/assets/logo/logo.svg" alt="Logo" width={16} height={16} priority />
          <span className="truncate font-medium text-lg text-green-900 ml-1">Home Garden</span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map(({ title, url, icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton onClick={() => router.push(url)} className="cursor-pointer">
                  {icon}
                  <span>{title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
