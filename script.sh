# creates a variable to hold a POST request to get an heroe and hold
# echo "creating a hero\n\n"
# # CREATE=$(
#     curl -X POST \
#     --data-binary '{"name": "McLovin", "age": 18, "power": "sexy"}' \
#     localhost:3000/heroes
#     # )
# # ID=$(echo $CREATE | jq .id)


# Script to test the web API
#!/bin/bash
echo -e "=== Requesting all heroes ===\n"
curl -s localhost:3000/heroes

echo -e "\n\n=== Requesting hero with id ===\n"
curl -s localhost:3000/heroes/1

echo -e "\n\n=== Requesting hero with wrong body ===\n"
curl -s -X POST \
    -H "Content-Type: application/json" \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/heroes

echo -e "\n\n=== Creating a hero ===\n"
curl -s -X POST \
    -H "Content-Type: application/json" \
    --data-binary '{"name": "Alfafa", "age": 19, "power": "Super Dumb"}' \
    localhost:3000/heroes
echo -e "\n"