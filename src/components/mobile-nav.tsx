import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon } from "lucide-react";
import { useGetMeQuery } from "@/redux/api/user.api";
import { UserProfileDropdown } from "@/shared/UserProfile";
import Link from "next/link";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);
	const { data, isLoading, refetch } = useGetMeQuery({});
	const user = data?.data;

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className="md:hidden"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<MenuIcon className="size-4.5" />
				)}
			</Button>
			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in bg-background shadow-lg",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button
									asChild
									className="justify-start"
									key={link.label}
									variant="ghost"
									onClick={() => setOpen(false)}
								>
									<Link href={link.href}>{link.label}</Link>
								</Button>
							))}
						</div>
						<div className="mt-12 flex flex-col gap-2">
							{isLoading ? (
								<span className="text-sm text-muted-foreground">Loading...</span>
							) : user ? (
								<UserProfileDropdown user={user} refetch={refetch} />
							) : (
								<>
									<Button asChild className="w-full" variant="outline" onClick={() => setOpen(false)}>
										<Link href="/login">Login</Link>
									</Button>
									<Button asChild className="w-full bg-secondary text-white hover:bg-secondary/90" onClick={() => setOpen(false)}>
										<Link href="/register">Join Now</Link>
									</Button>
								</>
							)}
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
