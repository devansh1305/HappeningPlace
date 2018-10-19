all: update_repo commit_changes push_repo

update_repo:
	echo "Updating repo..."
	git pull

commit_changes:
	git status
	git add .
	@read -p "Enter Commit message: " commit_mess; \
	git commit -m $$commit_mess

push_repo:
	git push
