"use client";

import { usePathname } from 'next/navigation';
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarHeading,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from '@/components/sidebar';

import {
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    Cog8ToothIcon,
    LightBulbIcon,
    PlusIcon,
    ShieldCheckIcon,
    UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
    Cog6ToothIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    Square2StackIcon,
    TicketIcon,
    UsersIcon,
} from '@heroicons/react/20/solid'

export default function MainNavBarItems() {

    let pathname = usePathname();

    return (
        <SidebarBody>
            <SidebarSection>
                <SidebarItem href="/" current={pathname === '/'}>
                    <HomeIcon />
                    <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/files" current={pathname.startsWith('/dashboard/files')}>
                    <Square2StackIcon />
                    <SidebarLabel>Files</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/teams" current={pathname.startsWith('/dashboard/teams')}>
                    <UsersIcon />
                    <SidebarLabel>Teams</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/settings" current={pathname.startsWith('/dashboard/settings')}>
                    <Cog6ToothIcon />
                    <SidebarLabel>Settings</SidebarLabel>
                </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
                <SidebarItem href="#">
                    <QuestionMarkCircleIcon />
                    <SidebarLabel>Support</SidebarLabel>
                </SidebarItem>

            </SidebarSection>
        </SidebarBody>
    )
}