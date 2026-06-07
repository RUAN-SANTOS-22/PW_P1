package fatec.ads.hortfruti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class Ferramenta {
    @Autowired
    private JavaMailSender smtp;

    public boolean enviarEmail(String para, String assunto, String corpo){
        SimpleMailMessage email = new SimpleMailMessage();
        try{
            email.setFrom("meuemail@meucorpo.com");
            email.setTo(para);
            email.setSubject(assunto);
            email.setText(corpo);
            smtp.send(email);
            return true;
        } 
        catch(Exception err){
            return false;
        }    
    }

}
