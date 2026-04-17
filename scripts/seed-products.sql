-- Clean Shopper — Product Seed Data
-- Run this in the Supabase dashboard: SQL Editor → New query → paste → Run

-- Add safety_score column if it doesn't exist
ALTER TABLE "Products" ADD COLUMN IF NOT EXISTS safety_score TEXT CHECK (safety_score IN ('clean', 'caution', 'avoid'));

-- Insert 20 seed products
INSERT INTO "Products" (name, brand, category, description, safety_score) VALUES

-- Personal Care (6)
('Pure Castile Liquid Soap', 'Dr. Bronner''s', 'Personal Care', 'Organic, fair trade certified. No synthetic preservatives, detergents, or foaming agents. EWG Verified.', 'clean'),
('Native Deodorant', 'Native', 'Personal Care', 'No aluminum, parabens, or sulfates. Made with coconut oil, shea butter, and baking soda.', 'clean'),
('Honest Company Shampoo', 'The Honest Company', 'Personal Care', 'Hypoallergenic, dye-free formula. No sulfates, parabens, or synthetic fragrances. Dermatologist tested.', 'clean'),
('Burt''s Bees Lip Balm', 'Burt''s Bees', 'Personal Care', '100% natural origin. Beeswax-based formula with vitamin E. No parabens, phthalates, or synthetic fragrances.', 'clean'),
('Crystal Mineral Deodorant', 'Crystal', 'Personal Care', 'Single-ingredient mineral salt. No aluminum chlorohydrate, parabens, or artificial fragrances.', 'clean'),
('CeraVe Moisturizing Cream', 'CeraVe', 'Personal Care', 'Contains ceramides and hyaluronic acid. Uses parabens as preservatives — low concern, but flagged by EWG.', 'caution'),

-- Home Cleaning (6)
('All-Purpose Cleaner', 'Method', 'Home Cleaning', 'Plant-derived surfactants, no bleach, phosphates, or synthetic dyes. Biodegradable and cruelty-free.', 'clean'),
('Branch Basics Concentrate', 'Branch Basics', 'Home Cleaning', 'One plant-based concentrate replaces all household cleaners. Free from fragrance, dyes, and preservatives.', 'clean'),
('Seventh Generation Dish Liquid', 'Seventh Generation', 'Home Cleaning', 'Plant-based formula with no synthetic fragrances or dyes. Biodegradable surfactants. USDA Biobased certified.', 'clean'),
('Mrs. Meyer''s Clean Day Multi-Surface Spray', 'Mrs. Meyer''s', 'Home Cleaning', 'Plant-derived cleaning agents with garden-inspired scents. Contains synthetic fragrance — moderate concern.', 'caution'),
('Disinfecting Wipes', 'Clorox', 'Home Cleaning', 'Contains quaternary ammonium compounds linked to respiratory irritation. Effective disinfectant but higher chemical concern.', 'avoid'),
('Puracy Natural Laundry Detergent', 'Puracy', 'Home Cleaning', 'Plant-based enzymes, no SLS, SLES, parabens, or synthetic fragrances. Hypoallergenic and dermatologist tested.', 'clean'),

-- Baby Care (4)
('Baby Shampoo & Wash', 'Burt''s Bees Baby', 'Baby Care', 'Tear-free, pediatrician tested. No parabens, phthalates, SLS, or synthetic fragrances. EWG Verified.', 'clean'),
('Honest Company Baby Lotion', 'The Honest Company', 'Baby Care', 'Hypoallergenic, dermatologist tested. Free from parabens, synthetic fragrances, and mineral oil.', 'clean'),
('Babyganics Laundry Detergent', 'Babyganics', 'Baby Care', 'Plant-based formula designed for sensitive skin. No optical brighteners or artificial fragrances. Fragrance-free option available.', 'clean'),
('Johnson''s Baby Powder', 'Johnson''s', 'Baby Care', 'Talc-based formula under ongoing regulatory review. The FDA has expressed concern over potential contamination risk.', 'avoid'),

-- Kitchen (4)
('Ecover Dish Soap', 'Ecover', 'Kitchen', 'Plant-based and mineral ingredients only. No phosphates, chlorine, or synthetic fragrances. Marine biodegradable.', 'clean'),
('Grove Collaborative Dish Soap', 'Grove Collaborative', 'Kitchen', 'Free from sulfates, parabens, and synthetic fragrances. Plant-based surfactants with a light botanical scent.', 'clean'),
('Dawn Ultra Original', 'Dawn', 'Kitchen', 'Synthetic surfactants including petroleum-derived compounds. Effective but contains fragrance and dyes flagged for moderate concern.', 'caution'),
('Seventh Generation Dish Soap', 'Seventh Generation', 'Kitchen', 'Plant-based, no synthetic fragrances or dyes. Chlorine-free and USDA Biobased certified. Fragrance-free option available.', 'clean');
