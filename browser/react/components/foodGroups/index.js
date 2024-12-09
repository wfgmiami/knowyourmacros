import React from 'react';
import { Apple, Bread, Candy, Carrot, Cereal, Dish, Glass, Ham, Hamburger, Hazelnut, Honey, Meat, Steak, Sausage, Spices, Soup, Oil, Fish, Dairy, Turkey, Sandwich, Grain, Peas, Pills } from '../Icon/Foods';


const groups = ({ height = '1em', width = '1em' }) => [
  {
    group: '0100',
    name: 'Dairy & Egg Products',
    icon: <Dairy height={height} width={width} />
  },
  {
    group: '0200',
    name: 'Spices & Herbs',
    icon: <Spices height={height} width={width} />
  },
  {
    group: '0300',
    name: 'Baby Foods',
    icon: <Honey height={height} width={width} />
  },
  {
    group: '0400',
    name: 'Fats & Oils',
    icon: <Oil height={height} width={width} />
  },
  {
    group: '0500',
    name: 'Poultry Products',
    icon: <Turkey height={height} width={width} />
  },
  {
    group: '0600',
    name: 'Soups, Sauces, & Gravies',
    icon: <Soup height={height} width={width} />
  },
  {
    group: '0700',
    name: 'Sausages & Luncheon Meats',
    icon: <Sausage height={height} width={width} />
  },
  {
    group: '0800',
    name: 'Breakfast Cereals',
    icon: <Cereal height={height} width={width} />
  },
  {
    group: '0900',
    name: 'Fruits & Fruit Juices',
    icon: <Apple height={height} width={width} />
  },
  {
    group: '1000',
    name: 'Pork Products',
    icon: <Ham height={height} width={width} />
  },
  {
    group: '1100',
    name: 'Vegetables & Vegetable Products',
    icon: <Carrot height={height} width={width} />
  },
  {
    group: '1200',
    name: 'Nut & Seed Products',
    icon: <Hazelnut height={height} width={width} />
  },
  {
    group: '1300',
    name: 'Beef Products',
    icon: <Steak height={height} width={width} />
  },
  {
    group: '1400',
    name: 'Beverages',
    icon: <Glass height={height} width={width} />
  },
  {
    group: '1500',
    name: 'Finfish & Shellfish Products',
    icon: <Fish height={height} width={width} />
  },
  {
    group: '1600',
    name: 'Legumes & Legume Products',
    icon: <Peas height={height} width={width} />
  },
  {
    group: '1700',
    name: 'Lamb, Veal, & Game Products',
    icon: <Meat height={height} width={width} />
  },
  {
    group: '1800',
    name: 'Baked Products',
    icon: <Bread height={height} width={width} />
  },
  {
    group: '1900',
    name: 'Sweets',
    icon: <Candy height={height} width={width} />
  },
  {
    group: '2000',
    name: 'Cereal Grains & Pasta',
    icon: <Grain height={height} width={width} />
  },
  {
    group: '2100',
    name: 'Fast Foods',
    icon: <Hamburger height={height} width={width} />
  },
  {
    group: '2500',
    name: 'Snacks',
    icon: <Sandwich height={height} width={width} />
  },
  {
    group: '3600',
    name: 'Restaurant Foods',
    icon: <Dish height={height} width={width} />
  },
  {
    group: '3700',
    name: 'Supplements',
    icon: <Pills height={height} width={width} />
  },
];

export const groupsObj = (size) => groups(size).reduce((memo, group) => {
  memo[group.group] = group; // eslint-disable-line
  return memo;
}, {});

export default groups;
