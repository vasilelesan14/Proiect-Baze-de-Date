set autocommit off;

-- Isnerare date pentru tabela CATEGORII
INSERT INTO categorii (denumire) VALUES ('Percutie');
INSERT INTO categorii (denumire) VALUES ('Viori');
INSERT INTO categorii (denumire) VALUES ('Chitare');
INSERT INTO categorii (denumire) VALUES ('Claviaturi');
INSERT INTO categorii (denumire) VALUES ('Boxe');
INSERT INTO categorii (denumire) VALUES ('Mixere');
INSERT INTO categorii (denumire) VALUES ('Lumini');
INSERT INTO categorii (denumire) VALUES ('Microfoane');
INSERT INTO categorii (denumire) VALUES ('Trompete');
INSERT INTO categorii (denumire) VALUES ('Saxofoane');

-- Inserare date pentru tabelele CLIENTI si DETALII_CLIENTI
DECLARE
    v_id_client NUMBER;
BEGIN
    -- Inserez clientul si salvez ID-ul generat
    INSERT INTO clienti (nume, prenume) 
    VALUES ('Craciun', 'Rodica')
    RETURNING id_client INTO v_id_client;

    -- Folosesc ID-ul generat pentru a insera în detalii_clienti
    INSERT INTO detalii_clienti (telefon, email, adresa, data_inregistrarii, id_client) 
    VALUES ('0726578758', 'craciun.rodica@yahoo.com', 'Strada Lalelelor, nr. 12', SYSDATE, v_id_client);
END;

COMMIT;

-- Inserare date pentru tabela PRODUSE

-- modalitatea I
INSERT INTO produse(nume, pret, stoc, id_categorie)
SELECT 'Mapex Mars Drum Set', 4900, 50, id_categorie
FROM categorii
WHERE denumire='Percutie';

INSERT INTO produse(nume, pret, stoc, id_categorie)
SELECT 'Jupiter JAS510Q Sax', 4769, 0, id_categorie
FROM categorii
WHERE denumire='Saxofoane';

-- modalitatea II
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Mapex Mars Drum Set', 4900, 50, 100);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Millenium Drum Set', 6000, 20, 100);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Tamburo Drum Set', 3429, 10, 100);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Yamaha Recording Drum Set', 21289, 10, 100);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Bete Millenium 2B', 15, 46, 100);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Bete Pro Mark 2B', 65, 24, 100);

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Vioara Karl Hoffmesister', 1049, 24, 102);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Vioara Sentor SR1400', 869, 45, 102);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Vioara Conrad Gotz Antique', 4669, 14, 102);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Vioara Hora Elite Laquered', 1226, 32, 102);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Vioara Zeta Electronic', 89499, 5, 102);

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Flame CG 100 BK', 298, 15, 104);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Harley Benton', 369, 22, 104);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Startone CG 851', 268, 32, 104);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Hora SM35 CTW', 719, 44, 104);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Chitara Wladen WAN350 Standard', 729, 18, 104);

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Aranjor Ketron SD 9', 19098, 10, 106);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Aranjor Korg P300 Set', 3896, 16, 106);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Aranjor Korg PA700 Oriental', 8988, 8, 106);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Aranjor Yamaha PSR-SX920', 12389, 19, 106);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Aranjor Yamaha Genos 2', 19798, 7, 106);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Aranjor Korg PA5X Oriental', 20498, 4, 106);

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Boxa Activa Alto TX315', 1309, 36, 108);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Boxa Pasiva FBT HIMMAX60', 3678, 20, 108);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Boxa Activa RCF ART-912A', 3039, 14, 108);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Boxa Dynacord VariLine VL212', 14998, 25, 108);

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Mixer Dynacord PM-1003', 14499, 11, 110);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Mixer Behringer PMP4000', 2540, 18, 110);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Mixer Dynacord CMS-1002', 9998, 8, 110);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Mixer Midas DM16', 1629, 17, 110);

INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Lumini FOS Light Set Baisc', 11395, 4, 112);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Lumini Fly Lights SetOne', 3114, 9, 112);
INSERT INTO produse (nume, pret, stoc, id_categorie) VALUES ('Lumini Cameo HydraBeam', 2116, 13, 112);

-- Inserare date pentru tabelele VANZARI si PRODUSE_VANZARI
DECLARE
    v_id_vanzare NUMBER;
BEGIN
    -- Inserez data si id-ul clientului pentru care are loc vanzarea
    INSERT INTO vanzari (data_vanzare, id_client)
    VALUES (SYSDATE, 510)
    RETURNING id_vanzare INTO v_id_vanzare;

    -- Folosesc v_id_vanzare pentru a insera produsele in tabela de legatura produse_vanzari
    INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (202, v_id_vanzare);
--    INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (204, v_id_vanzare);
--    INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (206, v_id_vanzare);
--    INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (208, v_id_vanzare);
--    INSERT INTO produse_vanzari (id_produs, id_vanzare) VALUES (202, v_id_vanzare);
END;

COMMIT;

SELECT * FROM categorii;
SELECT * FROM produse;
SELECT * FROM clienti;
SELECT * FROM detalii_clienti;
SELECT * FROM VANZARI;
SELECT * FROM produse_vanzari;

commit;