import qrcode from "qrcode";

const QrCode = qrcode;

export const generateQrCode = (req, res) => {
    const { nom, prenom , sexe , age} = req.body;
    const donnee = `${nom}, ${prenom}, ${sexe}, ${age}`;
    if (!donnee) {
        res.status(400).send("Les données sont requis pour le QR code!");
    } else {
        QrCode.toDataURL(donnee, (err, qrImage) => {
            if (err) {
                res.status(500).send("Echec pour le QR code!");
            } else {
                res.send(qrImage);
            }
        });
    }
};

