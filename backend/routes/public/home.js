// module.exports = function (app, connection) {

//     app.route('/api/pub/home/topexams')
//         .get(function (req, res, next) {
//             connection.query("SELECT * FROM weprep.`exam-list` ORDER BY `students` DESC LIMIT 3", [],
//                 function (error, result, fields) {
//                     if (error) { res.sendStatus(500) }
//                     else {
//                         res.header('Access-Control-Allow-Origin', '*');
//                         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//                         res.json({
//                             error: false,
//                             data: result
//                         });
//                     }
//                 }
//             );
//         });

//     app.route("/api/pub/home/query")
//         .post(function (req, res, nex) {
//             const name = req.body.name;
//             const mob = req.body.mob;
//             const time = req.body.time;
//             connection.query("INSERT INTO weprep.`queries-list` (`name`, `phoneNumber`, `preferredTime`) values(?,?,?)", [name, mob, time],
//                 function (error, result, fields) {
//                     if (error) res.json(error);
//                     else {
//                         res.header('Access-Control-Allow-Origin', '*');
//                         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//                         res.json({ error: false, message: "Category Created" });
//                     }
//                 });
//         });

//     app.route('/api/pub/home/topcourses')
//         .get(function (req, res, next) {
//             connection.query("SELECT * FROM weprep.`exam-categories`;", [],
//                 function (error, result, fields) {
//                     if (error) res.sendStatus(500);
//                     res.header('Access-Control-Allow-Origin', '*');
//                     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//                     res.json({
//                         error: false,
//                         data: result
//                     });
//                 }
//             );
//         });

//     app.route('/api/pub/home/toptestimonials')
//         .get(function (req, res, next) {
//             const results = {
//                 error: false,
//                 data: [
//                     { id: "T0001", text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore", subText: "Lorem Ipsum, SBI PO 2019", image: "avatar-f-1" },
//                     { id: "T0002", text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore", subText: "Lorem Ipsum, SBI PO 2019", image: "avatar-m-1" },
//                     { id: "T0003", text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore", subText: "Lorem Ipsum, SBI PO 2019", image: "avatar-f-2" },
//                     { id: "T0004", text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore", subText: "Lorem Ipsum, SBI PO 2019", image: "avatar-m-2" },
//                 ]
//             };
//             res.header('Access-Control-Allow-Origin', '*');
//             res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//             res.json(results);
//         });

//     app.route('/api/pub/home/search/:query')
//         .get(function (req, res, next) {
//             const query = req.params.query;
//             connection.query("SELECT * FROM weprep.`exam-list` WHERE `name` LIKE ? AND status=1", ["%" + query + "%"],
//                 function (error, result, fields) {
//                     if (error) {
//                         res.header('Access-Control-Allow-Origin', '*');
//                         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//                         res.json({
//                             error: false,
//                             data: error
//                         });
//                     }
//                     else {
//                         res.header('Access-Control-Allow-Origin', '*');
//                         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//                         res.json({
//                             error: false,
//                             data: result
//                         });
//                     }
//                 }
//             );
//         });
// };

