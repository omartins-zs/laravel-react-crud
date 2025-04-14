import React from "react"
import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
    title: string
    url: string
    icon?: Icon
}

export function NavMain({
    items,
}: {
    items: NavItem[]
}) {
    // Obtém a rota atual, se possível
    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : ""

    // Classe que será usada para item ativo, igual ao Quick Create
    const activeClasses =
        "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
    const inactiveClasses =
        "text-gray-600 hover:bg-gray-50 duration-200 ease-linear px-2 py-1 rounded-md"

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                {/* Botão Quick Create e Inbox permanecem inalterados */}
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="Quick Create"
                            className={activeClasses}
                        >
                            <IconCirclePlusFilled />
                            <span>Quick Create</span>
                        </SidebarMenuButton>
                        <Button
                            size="icon"
                            className="size-8 group-data-[collapsible=icon]:opacity-0"
                            variant="outline"
                        >
                            <IconMail />
                            <span className="sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* Mapeamento dos itens de navegação com links */}
                <SidebarMenu>
                    {items.map((item) => {
                        // Verifica se o item corresponde à rota atual
                        const isActive = currentPath === item.url

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild tooltip={item.title}>
                                    <a
                                        href={item.url}
                                        className={`flex items-center gap-2 ${isActive ? activeClasses : inactiveClasses
                                            }`}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
