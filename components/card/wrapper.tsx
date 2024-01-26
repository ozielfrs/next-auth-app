"use client";

import { SocialLinks } from "@/components/auth/social";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";

interface CardWrapperProps {
  description?: React.ReactNode;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showSocials?: boolean;
}

export const CardWrapper = ({
  description,
  children: content,
  header,
  footer,
  showSocials,
}: CardWrapperProps) => {
  return (
    <>
      <Card className="flex flex-col items-center overflow-auto">
        {header && <CardHeader>{header}</CardHeader>}
        <CardContent>
          {description && <CardDescription>{description}</CardDescription>}
        </CardContent>
        {content && <CardContent>{content}</CardContent>}
        {showSocials && (
          <CardFooter>
            <SocialLinks />
          </CardFooter>
        )}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </>
  );
};
