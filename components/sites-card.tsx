import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface SiteCardProps {
    image: StaticImageData;
    name: string;
    siteStats: string;
    address: string;
}

const SiteCard = ({image, name, siteStats, address}: SiteCardProps) => {
    return(
        <Card>
            <Image alt="site" src={image} className="rounded-md"/>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{siteStats}</CardDescription>
                <CardDescription>{address}</CardDescription>
            </CardHeader>
            <div className="flex justify-end pb-1 px-1">
                <Button size={"sm"}>View Details</Button>

            </div>
        </Card>
    )
}

export default SiteCard