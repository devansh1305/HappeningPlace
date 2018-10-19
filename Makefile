all: update_repo commit_changes

update_repo:
	echo "Update..."

commit_changes:
	@read -p "Enter Commit message: " commit_mess; \
	echo $$commit_mess
	
