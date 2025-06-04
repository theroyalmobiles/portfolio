const { allPath, allModel } = require("../models/allPath");

exports.getAllPath = (req, res) => {
    res.json(allPath);
};

exports.getAllModels = (req, res) => {
    res.json(allModel);
}

exports.getUrl = (req, res) => {
    res.json(
        {
            apiUrl: "https://theroyalmobilesserver.vercel.app",
            hostUrl: "https://theroyalmobiles.vercel.app",
            paymentUrl:"https://gpayqr.vercel.app/?amount=100"
        }
    );
}

exports.getPathByName = (req, res) => {
    const routeName = req.params.name.toLowerCase();
    const route = allPath.find(r => r.schema.toLowerCase() === routeName);

    if (route) {
        res.json(route);
    } else {
        res.status(404).json({ message: "Route not found" });
    }
};

exports.getAllModelsByName = (req, res) => {
    const routeName = req.params.name.toLowerCase();
    const route = allModel.find(r => r.schema.toLowerCase() === routeName);

    if (route) {
        res.json(route);
    } else {
        res.status(404).json({ message: "Route not found" });
    }
};
