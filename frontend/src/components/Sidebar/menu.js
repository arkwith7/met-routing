import { HomeOutlined as HomeOutlinedIcon } from "@mui/icons-material";
import { LocalLibraryOutlined as LocalLibraryOutlinedIcon } from "@mui/icons-material";
import { TrendingUpOutlined as TrendingUpOutlinedIcon } from "@mui/icons-material";
import { DescriptionOutlined as DescriptionOutlinedIcon } from "@mui/icons-material";
import React from "react";

export const menu = [
  {
    icon: <HomeOutlinedIcon />,
    title: "Home",
    items: []
  },
  {
    icon: <LocalLibraryOutlinedIcon />,
    title: "Education",
    items: [
      {
        title: "Technical Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      },
      {
        title: "Fundamental Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      },
      {
        title: "Elliot Wave Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      }
    ]
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    title: "Options"
  },
  {
    icon: <DescriptionOutlinedIcon />,
    title: "Blog"
  }
];
