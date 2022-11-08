import csv
import json

DEV = False

FILEPATH = "aisc-shapes-database-v15.0.csv"
json_dict = {}
with open(FILEPATH, "r") as file:
    csv_reader = csv.reader(file, delimiter=",")
    first = True
    headers = []
    second = True
    for line in csv_reader:
        if first:
            for item in line:
                if item in headers:
                    item = item + " Metric"
                headers.append(item)
            first = False
        else:
            shape_type = line[0]
            name = line[1]

            # DEV
            if DEV:
                if shape_type != "W":
                    break
                if not second:
                    break
                print(
                    "Shape Type: ",
                    shape_type,
                )
                print("Shape Name: ", name)

            # Add shape type to json_dict
            if shape_type not in json_dict:
                json_dict[shape_type] = {}

            if name in json_dict[shape_type]:
                print("Duplicate name")

            shape_data = {}
            # json_dict[shape_type][name] = shape_data

            for i, item in enumerate(line):
                if i <= 1:
                    continue
                else:
                    # print(headers[i], item)
                    shape_data[headers[i]] = item
                    # print(shape_data)
                    # DEV
                    # if DEV:
                    #     print(headers[i], item)

            second = False
            # print(shape_data)

            json_dict[shape_type][name] = shape_data

    # for type in json_dict:
    #     for shape in json_dict
    # print(json_dict)

# Serializing json
json_object = json.dumps(json_dict, indent=4)
# print(json_object)

# Writing to JSON File
with open("asic_shapes.json", "w") as outfile:
    outfile.write(json_object)

# JSON_dict Schema

# shapes = {
#     "Type": {
#         "W": {
#             "W14x22": {
#                 "Weight": 22,
#                 "Height": 14,
#                 "etc": "etc",
#             },
#             "next": {},
#         },
#         "M": {"next_shape": {}},
#     }
# }
