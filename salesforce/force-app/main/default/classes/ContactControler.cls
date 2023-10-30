public with sharing class ContactControler {

    @AuraEnabled(cacheable=false)
    public static List<Contact> getContacts(){
        return [SELECT name, email, phone, title FROM contact];
    }

    @AuraEnabled(cacheable=false)
    public static boolean updateContactEmail(String id, String email){
        Boolean success = false;
        try {
            Contact contactToUpdate = [SELECT id, email FROM Contact WHERE id =: id];
            contactToUpdate.email = email;
            Database.SaveResult SR = Database.update(contactToUpdate);
            if (sr.isSuccess()) {
                success = true;
            }
        } catch (Exception error) {
            System.debug('Error contact Update : ' + error);
        }
        return success;
    }
}