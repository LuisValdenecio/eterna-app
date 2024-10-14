"use client";

import { usePathname } from 'next/navigation';
import {
    SidebarBody,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from '@/components/sidebar';

import {
    Cog6ToothIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    Square2StackIcon,
    UsersIcon,
} from '@heroicons/react/20/solid'

export default function MainNavBarItems() {

    let pathname = usePathname();

    return (
        <SidebarBody>
            <SidebarSection>
                <SidebarItem href="/dashboard" current={pathname === '/dashboard'}>
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